import React, { useState, useEffect, useRef } from 'react';

import { Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Container,
  Col,
  Collapse,
} from "reactstrap";
import axios from 'axios';
import { signin, authenticate, isAuthenticated } from 'auth/index';

import MiluimSortingTable from 'components/bazak/Filters/MiluimSortingTable/SortingTable.js';

function Miluimpage({ match }) {

  return (
    <>
      <MiluimSortingTable />     {/*spinner in table*/}
    </>
  );
}

export default withRouter(Miluimpage);