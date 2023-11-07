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

import SingleMiluimArchiveTable from 'components/bazak/Filters/ArchiveSortingTabe/SingleMiluimArchiveTable.js';

function SingleMiluimArchivepage({ match }) {

  return (
    <>
      <SingleMiluimArchiveTable />     {/*spinner in table*/}
    </>
  );
}

export default withRouter(SingleMiluimArchivepage);