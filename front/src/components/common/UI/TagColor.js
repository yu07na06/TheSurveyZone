

const tagColorList  = [
    {"back":"#F6CECE","font":"#FE2E2E"},
    {"back":"#F6D8CE","font":"#FE642E"},
    {"back":"#F3E2A9","font":"#DBA901"},
    {"back":"#D0F5A9","font":"#5FB404"},

    {"back":"#A9F5A9","font":"#04B45F"},
    
    {"back":"#A9F5E1","font":"#04B486"},

    {"back":"#A9E2F3","font":"#01A9DB"},

    {"back":"#A9BCF5","font": "#0040FF"},

    {"back":"#E3CEF6","font":"#9A2EFE"},

    {"back":"#F6CEEC","font":"#FE2EC8"},
    {"back":"#F6CED8","font":"#DF013A"},
    {"back":"#CEF6E3","font":"#01DFA5"},
    ]
 
export const BackgoundColor = ({tagid}) => {
    console.log(tagid)
    const tagcolor = tagColorList[tagid-1]
    return tagcolor.back;
};

export const FontColor = ({tagid}) => {
    const tagcolor = tagColorList[tagid-1]
    return tagcolor.font;
};

export default BackgoundColor;