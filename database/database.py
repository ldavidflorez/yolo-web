import mysql.connector

class Database:

  def __init__(self):
    self.db = mysql.connector.connect(
      host = 'localhost',
      user = 'root',
      password = '',
      database = 'data_inference'
    )
    self.cursor = self.db.cursor()


  def insert_db(self, val1, val2, val3):
    sql = 'INSERT INTO detections (title, objects, image_result) VALUES (%s, %s, %s)'
    val = (val1, val2, val3)
    self.cursor.execute(sql, val)

    self.db.commit()

    print(self.cursor.rowcount, 'record inserted.')


  def select_db(self):
    self.cursor.execute('SELECT * FROM detections')

    results = self.cursor.fetchall()

    data = [{'id': r[0], 'created_at': r[1], 'title': r[2], 'objects': r[3], 'image_result': r[4]} \
      for r in results]
    
    return data


  def update_db(self, val1, val2):
    sql = 'UPDATE detections SET title = %s WHERE title = %s'
    val = (val1, val2)
    self.cursor.execute(sql, val)

    self.db.commit()

    print(self.cursor.rowcount, 'records affected')


  def delete_db(self, id):
    sql = 'DELETE FROM detections WHERE id = %s'
    val = (id, )
    self.cursor.execute(sql, val)

    self.db.commit()

    print(self.cursor.rowcount, "record(s) deleted")
