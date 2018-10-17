import React from "react";
import { render } from "react-dom";
import MarkdownEditorUI from "./components/MarkdownEditorUI";

// import { Router, Route, hashHistory } from "react-router";

// const appRouting = (
//     <Router history={hashHistory}>
//         <Route path="/">
//             <Route path="login" component={Login} />
//             <Route path="signup" component={SignUp} />
//             <Route path="rooms" component={Rooms}>
//                 <Route path=":roomId" component={Room} />
//             </Route>
//         </Route>
//     </Router>
// );

// if (!location.hash.length) {
//     location.hash = "#/login";
// }

render(<MarkdownEditorUI/>, document.getElementById("app"));
