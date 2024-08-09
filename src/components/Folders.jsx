import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

export default function Folders() {
  const user = useSelector((state) => state.userSlice);
  const folder = user.folders;
  console.log(folder);

  return (
    <div>
      {folder.map((i, idx) => {
        return (
          <div key={idx}>
            <Card data={i.name} id={i._id}></Card>
          </div>
        );
      })}
    </div>
  );
}
