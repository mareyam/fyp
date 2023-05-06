<<<<<<< HEAD
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="ezsocuvh",
        user="ezsocuvh",
        host="lallah.db.elephantsql.com",
        password="s5Dx8gM57z3Iq4ULd9T2zVY_QGQz5ZXZ"
    )
    print("Connected to PostgreSQL")
    conn.close()
except psycopg2.Error as e:
=======
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="ezsocuvh",
        user="ezsocuvh",
        host="lallah.db.elephantsql.com",
        password="s5Dx8gM57z3Iq4ULd9T2zVY_QGQz5ZXZ"
    )
    print("Connected to PostgreSQL")
    conn.close()
except psycopg2.Error as e:
>>>>>>> 5210ea133fd839ae5329553685a0972515319182
    print(f"Unable to connect to PostgreSQL: {e}")