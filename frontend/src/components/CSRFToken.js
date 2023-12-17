import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ClientContext } from '../App.js';
import Cookies from 'js-cookie';

const CSRFToken = () => {
    // var csrftoken = Cookies.get('csrftoken');
    var csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log("token" + csrftoken)
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;