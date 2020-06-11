HOST = '121.36.99.194'
# HOST = '127.0.0.1'
PORT = '3306'
DATABASE = 'bill'
USERNAME = 'root'
# PASSWORD = '123456'
PASSWORD = 'QWERTYasd!@#'

DB_URI = "mysql+pymysql://{username}:{password}@{host}:{port}/{db}?charset=utf8".format(username=USERNAME,
                                                                                        password=PASSWORD, host=HOST,
                                                                                        port=PORT, db=DATABASE)

SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
