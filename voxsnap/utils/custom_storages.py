from django.core.files.storage import get_storage_class
from django.conf import settings
from storages.backends.s3boto import S3BotoStorage
from django.core.files.move import file_move_safe
from django.core.files.base import ContentFile


class S3BotoStorageMixin(object):
    def isfile(self, name):
        return self.exists(name) and self.size(name) > 0

    def isdir(self, name):
        # That's some inefficient implementation...
        # If there are some files having 'name' as their prefix, then
        # the name is considered to be a directory
        if not name:  # Empty name is a directory
            return True

        if self.isfile(name):
            return False

        name = self._normalize_name(self._clean_name(name))
        dirlist = self.bucket.list(self._encode_name(name))

        # Check whether the iterator is empty
        for item in dirlist:
            return True
        return False

    def move(self, old_file_name, new_file_name, allow_overwrite=False):
        if self.exists(new_file_name):
            if allow_overwrite:
                self.delete(new_file_name)
            else:
                raise "The destination file '{}' exists and allow_overwrite is False".format(
                    new_file_name)

        old_key_name = self._encode_name(
            self._normalize_name(self._clean_name(old_file_name)))
        new_key_name = self._encode_name(
            self._normalize_name(self._clean_name(new_file_name)))

        k = self.bucket.copy_key(new_key_name, self.bucket.name, old_key_name)

        if not k:
            raise "Couldn't copy '{}' to '{}'".format(old_file_name,
                                                      new_file_name)

        self.delete(old_file_name)

    def makedirs(self, name):
        self.save(name + "/.folder", ContentFile(""))

    def rmtree(self, name):
        name = self._normalize_name(self._clean_name(name))
        dirlist = self.bucket.list(self._encode_name(name))
        for item in dirlist:
            item.delete()


class CachedS3BotoStorage(S3BotoStorage, S3BotoStorageMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.local_storage = get_storage_class(
            "compressor.storage.CompressorFileStorage")()

    def save(self, name, content):
        name = super().save(name, content)
        self.local_storage._save(name, content)
        return name


class MediaStorage(S3BotoStorage, S3BotoStorageMixin):
    location = settings.MEDIAFILES_LOCATION


StaticStorage = lambda: CachedS3BotoStorage(location=settings.
                                            STATICFILES_LOCATION)
