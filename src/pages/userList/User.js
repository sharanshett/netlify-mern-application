import React from  "react";
import { Button, Table } from "reactstrap";
import PropTypes from 'utils/propTypes';
import { FaRegAddressCard } from 'react-icons/fa';
import Avatar from 'components/Avatar';

const genderList = {
  1: "Male",
  0: "Female"
}

const UserTable = ({ userList, headers, ...restProps }) => {

    return (
      <React.Fragment>
        <Table size="sm" responsive hover>
        <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th style={{'white-space': 'nowrap', 'padding':'10px'}} key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>

        {userList.map(({user_id, user_name, contact, gender, country, address }, i) => (
          <tr key={i}>
            <td className="align-middle text-center"><Avatar /></td>
            <td className="align-middle text-center">{user_name}</td>
            <td className="align-middle text-center">{contact}</td>
            <td className="align-middle text-center">{genderList[gender] ? genderList[gender] : "Other"}</td>
            <td className="align-middle text-center">
              <Button className="btn btn-light btn-circle btn-xl text-center" style={{color: "green"}} onClick={() => restProps.onButtonClick({user_id, user_name, contact, gender, country, address})}>
              <FaRegAddressCard size={25}/>
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
        </Table >
      </React.Fragment>
    );
}

UserTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.date,
    })
  ),
};

UserTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserTable;
