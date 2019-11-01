import React from 'react';
import colors from 'res/colors.json'
export const Context = React.createContext();

const Theme = ({ name, bg, children }) => {
    let textColor, bgDark, bgLight, phColor, sbColor;
    if (bg === 'dark') {
        bgDark = colors.darkGrey;
        bgLight = colors.lightGrey
    } else {
        bgDark = colors.white;
        bgLight = colors.white;
    }
    switch (name) {
        case 'orange':
            textColor = colors.orange;
            sbColor = colors.orange;
            phColor = colors.lightOrange;
            break;
        case 'green':
            textColor = colors.green;
            sbColor = colors.green;
            phColor = colors.lightGreen;
            break;
        case 'blue':
            textColor = colors.indigo;
            sbColor = colors.indigo;
            phColor = colors.lightIndigo;
            break;
        case 'purple':
            textColor = colors.purple;
            sbColor = colors.purple;
            phColor = colors.lightPurple;
            break;
        case 'red':
            textColor = "orange";
            sbColor ="orange";
            phColor = "orange";
            break;
        default:
            textColor = colors.red;
            sbColor = colors.red;
            phColor = colors.lightRed;
            break;
    }
    if (bg === 'dark') { sbColor = colors.darkGrey; }
    return (
        <Context.Provider value={{ textColor, bgDark, bgLight, phColor, sbColor }}>
            {children ? children : null}
        </Context.Provider>
    );
};

export default Theme;