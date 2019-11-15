import os

import pandas as pd
import numpy as np

import psycopg2
import sqlite3
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, mapper, sessionmaker
from sqlalchemy import create_engine, MetaData, Table, Column, Integer
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

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
AAC_Stray = Table('AAC_Stray', metadata, Column("Animal ID", Integer, primary_key=True),
                      autoload=True)
AAC_Final = Table('AAC_Final', metadata, Column("Animal ID", Integer, primary_key=True),
                      autoload=True)
Pet_Dogs = Table('Pet_Dogs', metadata, Column("Location", Integer, primary_key=True),
                      autoload=True)
mapper(Found, AAC_Stray)
mapper(Final, AAC_Final)
mapper(Dogs, Pet_Dogs)

Session = sessionmaker(bind=engine)
session = Session()

Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)


# Save reference to table
#movies= Base.classes.bechdel_table
found = metadata.tables['AAC_Stray']
final = metadata.tables['AAC_Final']
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

#Render tableau story page
@app.route("/look-inside")
def lookinside():
    """Return the homepage."""
    return render_template("intakeoutake.html")

#Render outcomes page
@app.route("/adoption")
def adoption():
    """Return the homepage."""
    return render_template("adoption.html")

#Render found page
@app.route("/found")
def found():
    """Return the homepage."""
    return render_template("found.html")

#Render help page
@app.route("/how-to-help")
def help():
    """Return the homepage."""
    return render_template("howtohelp.html")

#Render resources page
@app.route("/resources")
def resources():
    """Return the homepage."""
    return render_template("resources.html")

#Pull data from db
@app.route("/aac-found")
def moviecolumns():
    # Use Pandas to perform the sql query
    stmt = session.query(found).statement
    found_df = pd.read_sql_query(stmt, session.bind)

    data = found_df.to_json(orient='records')
    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)