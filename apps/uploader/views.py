import base64
import hashlib
import hmac
import os
import time

from django.conf import settings
from django.http import Http404
from django.template.response import TemplateResponse
from rest_framework import authentication, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.narrations.models import Narration

from .models import FileItem


def uploader(request):
    if request.user.is_staff:
        narrations = Narration.objects.order_by('-id')
        context = {"narrations": narrations}
        templates = ["uploader/uploader.html"]
        return TemplateResponse(request, templates, context)
    else:
        print("Not admin uploader")
        raise Http404()


class FilePolicyAPI(APIView):
    """
    This view is to get the AWS Upload Policy for our s3 bucket.
    What we do here is first create a FileItem object instance in our
    Django backend. This is to include the FileItem instance in the path
    we will use within our bucket as you'll see below.
    """
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [authentication.SessionAuthentication]

    def post(self, request, *args, **kwargs):
        """
        The initial post request includes the filename
        and auth credientails. In our case, we'll use
        Session Authentication but any auth should work.
        """
        filename_req = request.data.get('filename')
        if not filename_req:
            return Response({"message": "A filename is required"},
                            status=status.HTTP_400_BAD_REQUEST)
        policy_expires = int(time.time() + 5000)
        user = request.user
        #username_str = str(request.user.username)
        customer = request.user.customer
        narration_id = int(request.data.get('narration'))
        narration = Narration.objects.get(pk=narration_id)
        """
        Below we create the Django object. We'll use this
        in our upload path to AWS.
        """
        year, month, day = time.strftime("%Y,%m,%d").split(',')
        file_obj = FileItem.objects.create(user=user,
                                           customer=narration.customer)
        file_obj_id = file_obj.id
        narration.audio_file = file_obj
        narration.save()
        upload_start_path = "{cust_id}/audio/{year}/{month}/{day}/".format(
            cust_id=narration.customer.id, year=year, month=month, day=day)
        _, file_extension = os.path.splitext(filename_req)
        filename_final = "{cust_short_name}-{narration_slug}{file_extension}".format(
            cust_short_name=narration.customer.short_name,
            narration_slug=narration.slug.replace("-", "_"),
            file_extension=file_extension)
        """
        Eventual file_upload_path includes the renamed file to the
        Django-stored FileItem instance ID. Renaming the file is
        done to prevent issues with user generated formatted names.
        """
        final_upload_path = "{upload_start_path}{filename_final}".format(
            upload_start_path=upload_start_path, filename_final=filename_final)
        if filename_req and file_extension:
            """
            Save the eventual path to the Django-stored FileItem instance
            """
            file_obj.path = final_upload_path
            file_obj.save()

        policy_document_context = {
            "expire": policy_expires,
            "bucket_name": settings.AWS_EDIT_UPLOAD_BUCKET,
            "key_name": "",
            "acl_name": "private",
            "content_name": "",
            "content_length": 524288000,
            "upload_start_path": upload_start_path,
        }
        policy_document = """
        {"expiration": "2050-01-01T00:00:00Z",
          "conditions": [
            {"bucket": "%(bucket_name)s"},
            ["starts-with", "$key", "%(upload_start_path)s"],
            {"acl": "%(acl_name)s"},

            ["starts-with", "$Content-Type", "%(content_name)s"],
            ["starts-with", "$filename", ""],
            ["content-length-range", 0, %(content_length)d]
          ]
        }
        """ % policy_document_context
        aws_secret = str.encode(settings.AWS_EDIT_UPLOAD_SECRET_KEY)
        policy_document_str_encoded = str.encode(
            policy_document.replace(" ", ""))
        url = 'https://{bucket}.s3.{region}.amazonaws.com/'.format(
            bucket=settings.AWS_EDIT_UPLOAD_BUCKET,
            region=settings.AWS_EDIT_UPLOAD_REGION)
        policy = base64.b64encode(policy_document_str_encoded)
        signature = base64.b64encode(
            hmac.new(aws_secret, policy, hashlib.sha1).digest())
        data = {
            "policy": policy,
            "signature": signature,
            "key": settings.AWS_EDIT_UPLOAD_ACCESS_KEY_ID,
            "file_bucket_path": upload_start_path,
            "file_id": file_obj_id,
            "filename": filename_final,
            "url": url
        }
        return Response(data, status=status.HTTP_200_OK)


class FileUploadCompleteHandler(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [authentication.SessionAuthentication]

    def post(self, request, *args, **kwargs):
        file_id = request.POST.get('file')
        size = request.POST.get('fileSize')
        course_obj = None
        data = {}
        type_ = request.POST.get('fileType')
        if file_id:
            obj = FileItem.objects.get(id=int(file_id))
            obj.size = int(size)
            obj.uploaded = True
            obj.type = type_
            obj.url = 'https://storytime.voxsnap.com/{path}mp3'.format(
                path=str(obj.path).rstrip('wav'))
            obj.save()
            data['id'] = obj.id
            data['saved'] = True
        return Response(data, status=status.HTTP_200_OK)
