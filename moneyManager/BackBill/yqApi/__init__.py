from flask import Blueprint

yq = Blueprint('yq', __name__)

import yqApi.views
