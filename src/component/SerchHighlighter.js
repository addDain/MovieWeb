import React from "react";

const SearchHighlighter = ({ title, e }) => {
  if (e !== "" && String(title).includes(e)) {
    const parts = String(title).split(new RegExp(`(${e}`, "gi"));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === title.toLowerCase() ? (
            <span key={index} style={{ color: "rgb(181, 137, 255)" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }
  return title;
};

export default SearchHighlighter;

// const matchedText = (text, newInput) => {
//   if (newInput !== "" && text.includes(newInput)) {
//     const parts = text.split(new RegExp(`(${newInput}`, "gi"));

//     return (
//       <>
//         {parts.map((part, index) =>
//           part.toLowerCase() === newInput.toLowerCase() ? (
//             <span key={index} style={{ fontWeight: 900 }}>
//               {part}
//             </span>
//           ) : (
//             part
//           )
//         )}
//       </>
//     );
//   }
//   return text;
// };
