FROM robd003/python3-node10:latest
LABEL Description="VoxSnap Django & Node" Maintainer="Robert Palmer <rob@voxsnap.com>"

ENV PYTHONUNBUFFERED 1

WORKDIR /opt/voxsnap-v2

# copy project relevant files into container
COPY package.json /opt/voxsnap-v2

# install project specific requirements
RUN npm install

COPY . /opt/voxsnap-v2

CMD npm run dev-server
