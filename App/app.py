import os

import pandas as pd
import numpy as np

import psycopg2
import sqlite3
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, Table
from sqlalchemy.orm import mapper, sessionmaker

app = Flask(__name__)


#################################################
# Database Setup
#################################################

class Dogs(object):
   pass
class Found(object):
   pass
class Final(object):
   pass
 
#----------------------------------------------------------------------
   
engine = create_engine('sqlite:///AA_db.sqlite', echo=False)
metadata = MetaData(engine)
AAC_Found = Table('AAC_Found', metadata, Column("Animal ID", Integer, primary_key=True),
                      autoload=True)
AAC_In_Out_Final = Table('AAC_In_Out_Final', metadata, Column("Animal ID", Integer, primary_key=True),
                      autoload=True)
Pet_Dogs = Table('Pet_Dogs', metadata, Column("Location", Integer, primary_key=True),
                      autoload=True)
mapper(Found, AAC_Found)
mapper(Final, AAC_In_Out_Final)
mapper(Dogs, Pet_Dogs)

Session = sessionmaker(bind=engine)
session = Session()

Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)


# Save reference to table
#movies= Base.classes.bechdel_table
found = metadata.tables['AAC_Found']
final = metadata.tables['AAC_In_Out_Final']
dogs = metadata.tables['Pet_Dogs']

# reflect the tables
Base.prepare(engine, reflect=True)

#Render intro page
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

#Render home page
@app.route("/home")
def home():
    """Return the homepage."""
    return render_template("home.html")

#Render dashboard page
@app.route("/dashboard")
def dashboard():
    """Return the homepage."""
    return render_template("dashboard.html")

#Pull data from db
@app.route("/cmovies")
def moviecolumns():
    # Use Pandas to perform the sql query
    stmt = session.query(dogs).statement
    dogs_df = pd.read_sql_query(stmt, session.bind)

    data = dogs_df.to_json(orient='records')
    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)