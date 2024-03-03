from . import auth_bp
from flask import jsonify, request, session
from .. import mongo
from bson import ObjectId

# 模拟用户数据库，实际项目中应替换为真实数据库
users = [
    {'username': 'user1', 'password': 'password1'},
    {'username': 'user2', 'password': 'password2'}
]


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json  # 假设前端通过 JSON 提交用户名和密码
    username = data.get('username')
    password = data.get('password')

    # 查找用户
    user = next((user for user in users if user['username'] == username), None)

    if user and user['password'] == password:
        # 登录成功，设置会话
        session['user'] = username
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401