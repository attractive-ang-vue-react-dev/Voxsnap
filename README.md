# README #

### Clone this Repo ###

```
git clone --recurse-submodules git@github.com:robd003/voxsnap-v2.git [whatever-you-want-to-call-it]
```

### Docker setup ###
#### Run docker-compose ####

```
docker-compose build
docker-compose run
```

### CrateDB setup ###
#### Restore database ####

Here's the info for starting up CrateDB and restoring the analytics data

Either use docker-compose to start crate or you can start it manually yourself:
```
docker run -d --name=crate -p 4200:4200 -p 5442:5432 -v crate_data:/data -e CRATE_HEAP_SIZE=1g crate -Cnetwork.host=_site_ -Clicense.enterprise=false -Cpath.repo=/data/backup
```

1. You'll want to install the CrateDB client called crash, it's just a python module / tool
```
pip3 install crash
```

2. Connect to your database
```
crash --hosts http://localhost:4200
```

3. Run these two commands within the SQL shell:
```
CREATE REPOSITORY dataset TYPE s3 WITH (bucket='voxsnap-contractor', endpoint='voxsnap-contractor.s3-accelerate.amazonaws.com', access_key='ask_rob_for_key', secret_key='ask_rob_for_secret', compress=true);
RESTORE SNAPSHOT dataset.analytics_2018_11 ALL WITH (wait_for_completion=true);
```

If you're trying to update the data then run the following:
```
DROP TABLE voxsnap.events_2018;
DROP TABLE voxsnap.events_session_2018;
DROP TABLE voxsnap.events_timeupdate_2018;
DROP TABLE voxsnap.errors;

RESTORE SNAPSHOT dataset.analytics_2018_11 ALL WITH (wait_for_completion=true);
```

4. Verify the database has been restored (http://localhost:4200/#!/tables/voxsnap/events_2018)

### Basic setup ###
#### Python dependencies and database setup

1. Install pipenv (in case you don't have it installed yet). 
    In the terminal:
    ```
    pip install pipenv
    ```
    (https://docs.pipenv.org/#install-pipenv-today)
    
2. Initialize virtual environment:
    ```
    pipenv install --three
    ```
3. Copy the file at *voxsnap/settings/local.example.py* and save it in the same directory under the name of *"local.py"*:

    ```
    cp voxsnap/settings/local.example.py voxsnap/settings/local.py
    ```

#### Create superuser

```
python manage.py createsuperuser
```


## Front-end

_Required Node.js version: 11_
([Node Version Manager](https://github.com/creationix/nvm) might come in handy)

```
$ cd frontend && `npm install`

```

#### Running development servers

Back-end:
```
pipenv run python manage.py runserver
```

Front-end:
```
cd frontend && npm run dev-server
```

---

For working without live-reloading and `webpack-dev-server` you can create a production build of nodejs/react assets 
```
cd frontend && npm run build-prod
```
