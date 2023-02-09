import { RotatingLines } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <li className="box">
      <RotatingLines
        strokeColor="#3F51B5"
        strokeWidth="4"
        animationDuration="1.5"
        width="50"
        visible={true}
      />
    </li>
  );
};
