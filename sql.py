import sqlite3
from os import sep

class SqlBase:
  
  def __init__(this, db):
    this.con = sqlite3.connect(db)

  def commit(this, query, param = ()):
    if param:
      this.con.execute(query, param)
    else:
      this.con.execute(query)
    
    return this

  def get(this, query, param = ()) -> list:
    cur = this.con.cursor()
    if param:
      cur.execute(query, param)
    else:
      cur.execute(query)

    result = cur.fetchall()
    cur.close()
    return result
  
  def getone(this, query, param = ()) -> tuple:
    cur = this.con.cursor()
    if param:
      cur.execute(query, param)
    else:
      cur.execute(query)

    result = cur.fetchone()
    cur.close()
    return result

  def go(this):
    this.con.commit()
    return this

  def close(this):
    this.con.close()
  
class Sql(SqlBase):
    def __init__(this):
        super().__init__(f'data{sep}wbs.db')
