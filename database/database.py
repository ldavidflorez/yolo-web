import mysql.connector
import datetime


def connect_db():
  db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = '',
    database = 'data_inference'
  )

  return db


def insert_db(val1, val2, val3):
  db = connect_db()
  cursor = db.cursor()

  sql = 'INSERT INTO detections (title, objects, image_result) VALUES (%s, %s, %s)'
  val = (val1, val2, val3)
  cursor.execute(sql, val)

  db.commit()

  print(cursor.rowcount, 'record inserted.')


def select_db():
  db = connect_db()
  cursor = db.cursor()

  cursor.execute('SELECT * FROM detections')

  results = cursor.fetchall()

  data = []
  for r in results:
    data.append({'id': r[0], 'created_at': r[1],
    'title': r[2], 'objects': r[3], 'image_result': r[4]})
  
  return data


def update_db(val1, val2):
  db = connect_db()
  cursor = db.cursor()

  sql = 'UPDATE detections SET title = %s WHERE title = %s'
  val = (val1, val2)
  cursor.execute(sql, val)

  db.commit()

  print(cursor.rowcount, 'records affected')


def delete_db(id):
  db = connect_db()
  cursor = db.cursor()

  sql = 'DELETE FROM detections WHERE id = %s'
  val = (id, )
  cursor.execute(sql, val)

  db.commit()

  print(cursor.rowcount, "record(s) deleted")

select_db()