from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Initialize DB
def init_db():
    with sqlite3.connect("contacts.db") as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS contacts (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL,
                            phone TEXT NOT NULL,
                            email TEXT
                        );''')

@app.route('/')
def index():
    with sqlite3.connect("contacts.db") as conn:
        contacts = conn.execute("SELECT * FROM contacts").fetchall()
    return render_template("index.html", contacts=contacts)

@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        with sqlite3.connect("contacts.db") as conn:
            conn.execute("INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)", (name, phone, email))
        return redirect(url_for('index'))
    return render_template('add.html')

@app.route('/edit/<int:contact_id>', methods=['GET', 'POST'])
def edit(contact_id):
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        with sqlite3.connect("contacts.db") as conn:
            conn.execute("UPDATE contacts SET name=?, phone=?, email=? WHERE id=?", (name, phone, email, contact_id))
        return redirect(url_for('index'))
    else:
        with sqlite3.connect("contacts.db") as conn:
            contact = conn.execute("SELECT * FROM contacts WHERE id=?", (contact_id,)).fetchone()
        return render_template("edit.html", contact=contact)

@app.route('/delete/<int:contact_id>')
def delete(contact_id):
    with sqlite3.connect("contacts.db") as conn:
        conn.execute("DELETE FROM contacts WHERE id=?", (contact_id,))
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
