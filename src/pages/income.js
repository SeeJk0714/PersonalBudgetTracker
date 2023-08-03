import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";

export default function Income() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [incomeList, setIncomeList] = useState([]);
    const [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        // 1. get the incomes from local storage
        const incomes = JSON.parse(localStorage.getItem("incomes"));
        // 2. check if there is a data in local storage or not
        if (incomes) {
            setIncomeList(incomes);
        }
    }, []);

    const addIncome = () => {
        // 1. clone the list
        const newincomeList = [...incomeList];

        // 2. make sure name & amount is not empty
        if (name && amount) {
            // 3. push new income
            newincomeList.push({
                id: nanoid(),
                name: name,
                amount: parseInt(amount),
            });

            // 4. save into the local storage & set the new state for incomeList
            setIncomeList(newincomeList);
            localStorage.setItem("incomes", JSON.stringify(newincomeList));

            // 5. clear the fields
            setName("");
            setAmount(0);
        } else {
            alert("Please insert your income");
        }
    };

    const deleteIncome = (id) => {
        // 1. filter the list
        const newincomeList = incomeList.filter((i) => i.id !== id);
        // 2. update to local storage and set new state
        setIncomeList(newincomeList);
        localStorage.setItem("incomes", JSON.stringify(newincomeList));
    };

    const checkBoxAll = (event) => {
        if (event.target.checked) {
            // 1. clone the existing checked list
            const newCheckedList = [];
            incomeList.forEach((i) => {
                newCheckedList.push(i.id);
            });
            setCheckedList(newCheckedList);
        } else {
            setCheckedList([]);
        }
    };

    const checkboxOne = (event, id) => {
        // if is checked
        if (event.target.checked) {
            // 1. clone existing checked list
            const newCheckedList = [...checkedList];
            // 2. push new id into the checked list
            newCheckedList.push(id);
            // 3. update the state
            setCheckedList(newCheckedList);
        } else {
            // 1. remove the id from the checked list
            const newCheckedList = checkedList.filter((i) => i !== id);
            // 2. update the state
            setCheckedList(newCheckedList);
        }
    };

    const deleteCheckedItems = () => {
        // 1. filter the list
        const newincomeList = incomeList.filter((i) => {
            // make sure the id is in the checked list
            if (checkedList && checkedList.includes(i.id)) {
                return false;
            }
            return true;
        });
        // 2. update to local storage and set new state
        setIncomeList(newincomeList);
        localStorage.setItem("incomes", JSON.stringify(newincomeList));
    };

    const calculateTotal = () => {
        let total = 0;
        incomeList.forEach((i) => {
            total += parseInt(i.amount);
        });
        return total;
    };

    return (
        <div
            className="container mt-5 mx-auto"
            style={{
                maxWidth: "800px",
            }}
        >
            <Card>
                <Card.Body>
                    <Card.Title>Income</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        disabled={
                                            incomeList && incomeList.length > 0
                                                ? false
                                                : true
                                        }
                                        onChange={(event) => {
                                            checkBoxAll(event);
                                        }}
                                    />
                                </th>
                                <th>Source</th>
                                <th>Amount</th>
                                <th>
                                    Actions
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-2"
                                        disabled={
                                            checkedList &&
                                            checkedList.length > 0
                                                ? false
                                                : true
                                        }
                                        onClick={(event) => {
                                            event.preventDefault();
                                            deleteCheckedItems();
                                        }}
                                    >
                                        <BsTrash />
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeList.length > 0 ? (
                                incomeList.map((i) => {
                                    return (
                                        <tr key={i.id}>
                                            <td>
                                                <Form.Check
                                                    checked={
                                                        checkedList &&
                                                        checkedList.includes(
                                                            i.id
                                                        )
                                                            ? true
                                                            : false
                                                    }
                                                    type="checkbox"
                                                    onChange={(event) => {
                                                        checkboxOne(
                                                            event,
                                                            i.id
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td>{i.name}</td>
                                            <td>${i.amount}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        deleteIncome(i.id);
                                                    }}
                                                >
                                                    <BsTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3}>No income added yet.</td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan={2}>Total</td>
                                <td>${calculateTotal()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Form>
                        <Form.Group className="mb-1 mt-2">
                            <Form.Control
                                type="text"
                                placeholder="Type your income here..."
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Control
                                type="number"
                                placeholder="Type your amount here..."
                                value={amount}
                                min={0}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={(event) => {
                                event.preventDefault();
                                addIncome();
                            }}
                        >
                            Add New
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Link to="/" className="pt-2 text-center">
                Go back to Dashboard
            </Link>
        </div>
    );
}
