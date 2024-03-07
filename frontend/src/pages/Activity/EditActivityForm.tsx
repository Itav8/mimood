interface Activity {
  id: string;
  // name: string;
  // feeling: string;
  // description: string;
  // energyLevel: EnergyLevels;
  // createdDatetime: string;
}

export const EditActivityForm = (props: Activity) => {
  return (
    <>
      <h1>EDIT Activity</h1>
      <div>{props.id}</div>
    </>
  );
};
