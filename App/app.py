import os

import pandas as pd
import numpy as np

import psycopg2

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///AA_db.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

class Found(Base):

    __tablename__ = 'AAC_Found'

    index = Column(Integer, primary_key=True)

class AAC(Base):

    __tablename__ = 'AAC_In_Out_Final'

    index = Column(Integer, primary_key=True)

class Pets(Base):

    __tablename__ = 'Pet_Dogs'

    index = Column(Integer, primary_key=True)

# reflect the tables
Base.prepare(db.engine, reflect=True)

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
    stmt = db.session.query(movies).statement
    movie_df = pd.read_sql_query(stmt, db.session.bind)



         # Format the data to send as json
    data = {
        "id": movie_df.imdbid.values.tolist(),
        "bechdel_rating": movie_df.bechdel_rating.values.tolist(),
        "title": movie_df.title.values.tolist(),
        "year": movie_df.year.values.tolist(),
        "binary": movie_df.binary.values.tolist(),
        "budget": movie_df.budget_2013.values.tolist(),
        "dom_gross": movie_df.domgross_2013.values.tolist(),
        "int_gross": movie_df.intgross_2013.values.tolist(),
        "genre": movie_df.genres.values.tolist(),
        "genreA": movie_df.A.values.tolist(),
        "genreB": movie_df.B.values.tolist(),
        "genreC": movie_df.c.values.tolist(),
        "decade": decade,
        "imdb_rating": movie_df.averageRating.values.tolist(),
        "num_votes": movie_df.numVotes.values.tolist()
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run()