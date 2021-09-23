import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import React, { useState } from 'react';

export default function UserSearchComponent({ onParamChange, onTypeChange }) {
  const [searchText, setSearchText] = useState("");

  return (
    <Row >
      <Col xl={3} />
      <Col xl={9}>
        <Form className="mb-4 mt-5" onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                style={{'font-size': '0.8em'}}
                  onChange={(e) => { setSearchText(e.target.value); onParamChange(e); }}
                  name="search_text"
                  type="text"
                  value={searchText}
                  placeholder="ENTER NAME OR CONTACT OF USER YOU WANT TO FIND"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup xs="auto" className="ml-2">
                <Button onClick={(e) => { setSearchText(""); onTypeChange(e); }} color="primary">
                  Clear
              </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col md={2} />
    </Row>
  );
}