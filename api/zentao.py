# -*- coding: utf-8 -*-
import os
import sys
import requests
import json
import re
# if content == '-hello':
#     bot.SendTo(contact, '你好，我是QQ机器人')
#     t_f = os.popen('nc --start')
#     print t_f.read()
# elif content == '-stop':
#     bot.SendTo(contact, 'QQ机器人已关闭')
#     bot.Stop()
# el
# bot.SendTo(contact, '你好，我是QQ机器人')
# resp = requests.post("http://www.tuling123.com/openapi/api", data={
#     "key": "5aad2a6b46894ae4b082232c6a02f5eb",
#     "info": content,
#     "userid": contact.name
# })
# bot.SendTo(contact, resp.json()["text"])
def onQQMessage(bot, contact, member, content):
    if bot.isMe(contact, member):
        return
    if '@ME' in content:
        s = 'nc --message ' + content.replace(' ', '$') + ' --name ' + member.name.replace(' ', '')
        s = s.decode('utf-8').encode('gbk','ignore')
        print s
        t_f = os.popen(s)
        res = t_f.read()
        bot.SendTo(contact, res.strip())
    if contact.ctype == 'discuss' and ('@'+bot.session.nick) in content:
        s = 'nc --message ' + content.replace(' ', '$') + ' --name ' + member.name.replace(' ', '')
        s = s.decode('utf-8').encode('gbk','ignore')
        print s
        t_f = os.popen(s)
        res = t_f.read()
        bot.SendTo(contact, res.strip())
       