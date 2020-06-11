from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from yqApi import yq as yq_blueprint
import config

app = Flask(__name__)
app.config.from_object(config)

app.register_blueprint(yq_blueprint, url_prefix='/yq')  # 注册蓝图

db = SQLAlchemy(app)

import Bill.views
