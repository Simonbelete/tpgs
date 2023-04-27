import React, { ReactElement, useRef } from "react";

interface Ingredient {
  name: string;
  qty: number;
}

const Formulation = (): ReactElement => {
  const indexes: (keyof Ingredient)[] = ["name", "qty"];

  const data = useRef([
    {
      id: 1,
      name: "Maze",
      qty: 10,
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      min: "",
      max: "",
    },
  ]);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    const { name, value } = e.target;
    const row = key;
    const col = indexes[indexes.findIndex((e) => e == name)];
    data.current[row][col] = Number(value) as never;
    console.log(value);

    console.log(data.current[0].qty);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>sfds</th>
          </tr>
        </thead>
        <tbody>
          {data.current.map((d, key) => (
            <tr key={key}>
              <td>{d.name}</td>
              <td>
                <input
                  name="qty"
                  value={d.qty}
                  type="number"
                  onChange={(e) => onChangeInput(e, key)}
                  placeholder=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Formulation;
