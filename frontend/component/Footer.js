/**
 * Created by jun_ma on 2016/4/15.
 */

import React from 'react';

const footerStyle = {
    marginTop:50,
    padding:20,
};

export default class  Footer extends React.Component{
    render(){
       return(
           <div className="text-center" style={footerStyle}>
                &copy; CopyRight majun
           </div>
       )
    }
}