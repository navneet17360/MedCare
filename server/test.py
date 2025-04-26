import mysql.connector
from mysql.connector import Error

try:
    print("Trying to connect...")
    connection = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='root',
    connection_timeout=5
)

    if connection.is_connected():
        print("✅ Database connected successfully!")

except Error as e:
    print("❌ Error while connecting to database:", e)

finally:
    if 'connection' in locals() and connection.is_connected():
        connection.close()
