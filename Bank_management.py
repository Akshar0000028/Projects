from abc import ABC,abstractmethod
from datetime import datetime
from typing import List,Dict,Optional


#abstarct basse class
class BankAccount(ABC):

    _total_account_created = 0

    def __init__(self,account_no : str , account_holder_name: str ,initial_balance : float = 0.0):

        #encapsulation ( for private attributes)
        self.__account_no = account_no
        self.__account_holder_name = account_holder_name
        self.__initial_balance = initial_balance
        self.__transaction_history = []

        BankAccount._total_account_created += 1

        #for account record 
        self._add_transaction("Account Created", initial_balance, "account opened with initial balance")

    @property
    def account_no(self) -> str:
        return self.__account_no
    
    @property 
    def account_holder_name(self)-> str:
        return self.__account_holder_name
    
    @property
    def initial_balance(self)->float:
        return self.__initial_balance
    
    @property 
    def transacction_history(self)->List[Dict]:
        return self.__transaction_history.copy() 
    
    #protected method for adding transaction history 
    def _add_transaction(self,transaction_type:str,amount:float ,description:str="" ):
        transaction = {
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "type" : transaction_type,
            "amount":amount,
            "description":description
        }
        self.__transaction_history.append(transaction)

    #for deposit money
    def deposit(self,amount:float , reference_note :str ="")->bool:

        try :
            if amount <= 0:
                raise ValueError("Deposit amount must be positive.")    
            self.__initial_balance += amount

            description = f"Deposited {amount} with reference note: {reference_note}"
            self._add_transaction("Deposit",amount,description)
            print("Deposited successfully. ")
            if reference_note:
                print(f"reference note : {reference_note}")
            return True

        except ValueError as e:
            print(f"Deposit Failed: {e}")
            raise

    #for withdraw money 
    def withdraw(self,amount :float ) -> bool:

        try:
            if amount<= 0 :
                raise ValueError("Withdraw amount must be positive.")
            
            if amount > self.__initial_balance:
                raise ValueError("Insufficient balance for withdrawal.")
            
            self.__initial_balance -= amount
            self._add_transaction("Withdraw",amount, "withdrawal")
            print("Withdraw Successfully.")
            return True
        
        except ValueError as e:
            print(f"Withdrawal Failed : {e}")
            raise

    def get_account_details(self)->Dict:
        return {
            "account_no": self.__account_no,
            "account_holder_name": self.__account_holder_name,
            "balance": self.__initial_balance
        }
    
    #abstract method for calculating interest
    @abstractmethod
    def calculate_interest(self)->float:
        pass

    @classmethod
    def get_total_accounts_created(cls)->int:
        return cls._total_account_created
    
    def __del__(self):
        print(f"Bank account {self.__account_no} is being deleted.")



#interface for loanable account
class ITransaction(ABC):

    @abstractmethod
    def transfer(self,amount:float ,target_account:'BankAccount')->bool:
        pass

    @abstractmethod
    def print_trasaction_receipt(self,transaction_type :str ,amount:float,target_account:Optional[str]=None):
        pass


#inheritence and polymorphism 
class SavingsAccount(BankAccount,ITransaction):

    def __init__(self,account_no : str , account_holder_name:str,initial_balance : float =0.0,interest_rate:float=3.5):
    
        super().__init__(account_no,account_holder_name,initial_balance)
        self.__interest_rate = interest_rate
    
    @property
    def interest_rate(self)->float:
        return self.__interest_rate
    
    @interest_rate.setter
    def interest_rate(self,rate:float):
        if rate < 0:
            raise ValueError("interest rate cannot be negative")
        self.__interest_rate = rate 

    def calculate_interest(self) -> float:
        interest=self.initial_balance * (self.__interest_rate / 100)
        return interest
    
    def apply_interest(self):
        interest = self.calculate_interest()
        if interest > 0:
            self.deposit(interest, f"Interest applied @ {self.__interest_rate}%")
            print(f"Interest of rs {interest:.2f} applied to your account.")

    #interface implementation for Itransaction Method
    def transfer(self,amount : float ,target_account : BankAccount)->bool:
        try:
            if target_account is None:
                raise ValueError("Target Account is Invalid.")
            
            if amount <= 0:
                raise ValueError("Transfer amount must be positive.")
            
            self.withdraw(amount)
            target_account.deposit(amount, f"Transfer from {self.account_no}")

            self.print_trasaction_receipt("Transfer",amount,target_account.account_no)
            return True
        
        except ValueError as e:
            print(f"Transfer Failed : {e}")
            raise

    def print_trasaction_receipt(self, transaction_type: str, amount: float, 
                                  target_account: Optional[str] = None):
        print("\n" + "="*50)
        print("          TRANSACTION RECEIPT")
        print("="*50)
        print(f"Date/Time:    {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Type:         {transaction_type}")
        print(f"Amount:       ${amount:.2f}")
        print(f"From Account: {self.account_no}")
        if target_account:
            print(f"To Account:   {target_account}")
        print(f"New Balance:  ${self.initial_balance:.2f}")
        print("="*50 + "\n")

    def _get_additional_info(self)->str:
        interest = self.calculate_interest()
        return f"Interest Rate: {self.__interest_rate}% | Accrued Interest: ${interest:.2f}"
    

#for current account
class CurrentAccount(BankAccount,ITransaction):

    def __init__(self, account_no:str , account_holder_name : str,initial_balance: float= 0.0, overdraft_limit:float=1000.0):
        super().__init__(account_no,account_holder_name,initial_balance)
        self.__overdraft_limit = overdraft_limit

    @property
    def overdraft_limit(self)->float:
        return self.__overdraft_limit
    
    @property
    def available_balance(self)->float:
        return self.initial_balance + self.__overdraft_limit

    def calculate_interest(self)->float:
        return 0.0
    
    #for withdraw money with overdraft limit
    def withdraw(self, amount:float)->bool:

        try:
            if amount <= 0:
                raise ValueError("Withdraw amount must be positive.")
            
            if amount > self.available_balance:
                raise ValueError("insufficient balance and overdraft limit for withdrawal.")
            
            self._BankAccount__initial_balance -= amount
            self._add_transaction("Withdraw", amount, "withdrawal using overdraft")
            print("Withdraw successfully.")
            return True
            
        except ValueError as e:
            print(f"Withdrawal Failed : {e}")
            raise
    
    def transfer(self, amount: float, target_account: BankAccount) -> bool:
        try:
            if target_account is None:
                raise ValueError("Target Account is Invalid.")
            
            if amount <= 0:
                raise ValueError("Transfer amount must be positive.")
            
            self.withdraw(amount)
            target_account.deposit(amount, f"Transfer from {self.account_no}")
            self.print_trasaction_receipt("Transfer", amount, target_account.account_no)
            return True
        
        except ValueError as e:
            print(f"Transfer Failed : {e}")
            raise

    def print_trasaction_receipt(self, transaction_type: str, amount: float, 
                                  target_account: Optional[str] = None):
        print("\n" + "="*50)
        print("          TRANSACTION RECEIPT")
        print("="*50)
        print(f"Date/Time:    {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Type:         {transaction_type}")
        print(f"Amount:       ${amount:.2f}")
        print(f"From Account: {self.account_no}")
        if target_account:
            print(f"To Account:   {target_account}")
        print(f"New Balance:  ${self.initial_balance:.2f}")
        print("="*50 + "\n")
    

class TransactionHistory:
    
    @staticmethod
    def display_history(account: BankAccount, limit: int = 10):
        
        history = account.transacction_history
        
        if not history:
            print("\n  No transactions found.")
            return
        
        print("\n" + "="*70)
        print(f"  TRANSACTION HISTORY - Account: {account.account_no}")
        print("="*70)
        
        for transaction in reversed(history[-limit:]):
            print(f"{transaction['date']} | "
                  f"{transaction['type']} | "
                  f"${transaction['amount']:.2f} | "
                  f"{transaction['description']}")
        
        print("="*70 + "\n")


#menu toggle for banking system

def main_menu():
    accounts = {}

    while True:
        print("\n1. Create Account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Transfer")
        print("5. Apply Interest (Savings Only)")
        print("6. View Account Details")
        print("7. View Transaction History")
        print("8. Total Accounts Created")
        print("9. Exit")

        choice = input("Enter Your Choice: ")

        try:
            if choice == "1":
                acc_no = input("Enter Account Number: ")
                name = input("Enter Account Holder Name: ")
                balance = float(input("Enter Initial Balance: "))
                acc_type = input("Type (Savings/Current): ").upper()

                if acc_type == "Savings":
                    rate = float(input("Enter Interest Rate (%): "))
                    accounts[acc_no] = SavingsAccount(acc_no, name, balance, rate)
                else:
                    overdraft = float(input("Enter Overdraft Limit: "))
                    accounts[acc_no] = CurrentAccount(acc_no, name, balance, overdraft)

                print("Account Created Successfully!")

            elif choice == "2":
                acc = accounts[input("Enter Account Number: ")]
                amount = float(input("Enter Deposit Amount: "))
                note = input("Reference Note (optional): ")
                acc.deposit(amount, note)

            elif choice == "3":
                acc = accounts[input("Enter Account Number: ")]
                amount = float(input("Enter Withdraw Amount: "))
                acc.withdraw(amount)

            elif choice == "4":
                from_acc = accounts[input("From Account: ")]
                to_acc = accounts[input("To Account: ")]
                amount = float(input("Enter Transfer Amount: "))
                from_acc.transfer(amount, to_acc)

            elif choice == "5":
                acc = accounts[input("Enter Account Number: ")]
                if isinstance(acc, SavingsAccount):
                    acc.apply_interest()
                else:
                    print("Interest applicable only for Savings Account.")

            elif choice == "6":
                acc = accounts[input("Enter Account Number: ")]
                print(acc.get_account_details())

            elif choice == "7":
                acc = accounts[input("Enter Account Number: ")]
                TransactionHistory.display_history(acc)

            elif choice == "8":
                print("Total Accounts Created:",
                      BankAccount.get_total_accounts_created())

            elif choice == "9":
                print("Thank you for using Banking System.")
                break

            else:
                print("Invalid Option!")

        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main_menu()
