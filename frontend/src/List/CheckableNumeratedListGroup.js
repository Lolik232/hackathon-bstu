// import {ListGroup} from "react-bootstrap";
// import React from "react";
//
// export function CheckableNumeratedListGroup({list}) {
//     const [forceUpdater, setForceUpdater] = React.useState({});
//
//     return (<ListGroup>
//         {list().map((item) => (<NumeratedListItem key={item.index} item={item}/>))}
//     </ListGroup>)
//
//     function NumeratedListItem({item}) {
//         return (<ListGroup.Item active={!!item.checked}
//                                 onClick={() => (HandleOnClickEvent(item))}>
//             {item.value}
//         </ListGroup.Item>)
//     }
//
//     function HandleOnClickEvent(item) {
//         list(item.index);
//         setForceUpdater({...forceUpdater});
//     }
// }
//
