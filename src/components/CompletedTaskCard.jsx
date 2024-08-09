import React from "react";
import { TiTick } from "react-icons/ti";

export default function CompletedTaskCard({ idx, data }) {
  return (
    <div>
      <div className="bg-base-200 collapse">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-secondary text-primary-content peer-checked:bg-primary peer-checked:text-secondary-content text-lg font-normal">
          Completed Task {idx}
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-accent peer-checked:text-secondary-content ">
          <div className=" flex flex-col gap-4">
            <div className=" flex flex-row gap-2 items-center mt-3">
              <TiTick className=" text-3xl text-warning"></TiTick>
              <div className=" text-base font-medium ">{data.title}</div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="text-primary">
                {new Date(data.dateAdded).toLocaleDateString()}
              </div>
              <div className="text-warning">
                {new Date(data.dateOfComplition).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
