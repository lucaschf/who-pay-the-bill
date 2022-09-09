import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { MyContext } from "../context";


const Stage1 = () => {

  const context = useContext(MyContext);

  const textInput = useRef();
  const [error, setError] = useState([false, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);

    if (validate) {
      setError([false, ""]);
      textInput.current.value = "";
      context.addPlayer(value);
    }
  }

  const validateInput = (value) => {
    if (value === "") {
      setError([true, "Provide a name"]);
      return false;
    }

    if (value.length < 2) {
      setError([true, "Provide a name with at least 2 characters"]);
      return false;
    }

    return true;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add player name"
            name="player"
            ref={textInput}
          />
        </Form.Group>

        {error[0] && <Alert variant="danger" className="mt-2">{error[1]} </Alert>}

        <Button className="miami" variant="primary" type="submit">Add player</Button>

        {context.state.players && context.state.players.length > 0 &&
          <>
            <hr />
            <ul className="list-group">
              {
                context.state.players.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                    {item}
                    <span
                      className='badge badge-danger'
                      onClick={() => context.removePlayer(index)}
                    >
                      X
                    </span>
                  </li>
                ))
              }
            </ul>
            <div className="action_button" onClick={context.nextStage}>NEXT</div>
          </>
        }
      </Form>
    </>
  )
}

export default Stage1;
