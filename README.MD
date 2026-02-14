🏦 Banking Management System (OOP Based)

A console-based Banking Management System implemented in Python using Object-Oriented Programming (OOP) principles.

This project demonstrates:

Encapsulation

Abstraction

Inheritance

Polymorphism

Interface Implementation

Constructor & Destructor

Class Methods

Exception Handling

Menu-Driven Application

📌 Features

Create Savings Account

Create Current Account

Deposit Money

Withdraw Money

Transfer Funds

Apply Interest (Savings Account Only)

View Account Details

View Transaction History

Track Total Accounts Created

🧠 OOP Concepts Used
1️⃣ Encapsulation

Private attributes:

self.__account_no
self.__account_holder_name
self.__initial_balance
self.__transaction_history


Accessed using @property.

2️⃣ Abstraction

Abstract Base Class:

class BankAccount(ABC):
    @abstractmethod
    def calculate_interest(self):
        pass

3️⃣ Inheritance
class SavingsAccount(BankAccount, ITransaction)
class CurrentAccount(BankAccount, ITransaction)

4️⃣ Polymorphism

Method overriding:

def withdraw(self, amount):


Implemented differently in:

SavingsAccount

CurrentAccount

5️⃣ Interface
class ITransaction(ABC):
    @abstractmethod
    def transfer(self, amount, target_account):


Implemented in both:

SavingsAccount

CurrentAccount

6️⃣ Class Method
@classmethod
def get_total_accounts_created(cls)

7️⃣ Destructor
def __del__(self):



▶️ How to Run

Install Python (3.8+ recommended)

Save file as main.py

Open terminal in project folder

Run:

python main.py

🖥 Menu Options
1. Create Account
2. Deposit
3. Withdraw
4. Transfer
5. Apply Interest (Savings Only)
6. View Account Details
7. View Transaction History
8. Total Accounts Created
9. Exit

💡 Example Usage

Create account:

Enter Account Number: 5544554455
Enter Account Holder Name: Akshar
Enter Initial Balance: 5000
Type (S/C): S
Enter Interest Rate (%): 5


Deposit:

Enter Account Number: 5544554455
Enter Deposit Amount: 1000

🔒 Exception Handling

Prevents negative deposits

Prevents invalid withdrawals

Prevents overdraft beyond limit

Prevents transfer to invalid account

Handles invalid menu input

🚀 Future Improvements

Persistent storage (JSON or SQLite)

Login authentication system

GUI version (Tkinter)

Web version (Flask/Django)

Account number auto-generation

Admin dashboard

👨‍💻 Author

Akshar Savaliya

AI/ML Enthusiast | Python Developer

📜 License

This project is for educational purposes.