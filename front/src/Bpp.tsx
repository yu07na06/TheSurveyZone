import React from 'react';

interface IProps {
    name: string;
    job: string;
    setCounter: (x: number) => void;
  }

function Bpp ({ name, job, setCounter, count}:IProps) {
    
    const onClick = () => {
        setCounter(count+1);
      };
    
    return (
        <>
            <div>
                hello {name} {job}
            </div>
            <button onClick={onClick}>증가</button>
        </>
    );

};

Bpp.defaultProps = {
    name: "최진웅",
    job: '노가더'
};

export default Bpp;

//==================================================================================================================================

// import React from 'react';

// type GreetingsProps = {
//     name: string;
//     mark: string;
//   };

  

// const Bpp : React.FC<GreetingsProps> = ({ name, mark }) => {

//     const a :GreetingsProps = {
//         name:"aaa",
//         mark:200
//     }
    
//     return (
//         <div>
//            {name} 안녕  {mark}
//         </div>
//     );
// };

// Bpp.defaultProps = {
//     name: "유나",
//     mark: '?'
// };

// export default Bpp;