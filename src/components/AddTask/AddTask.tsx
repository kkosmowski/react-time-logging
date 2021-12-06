import { ReactElement } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface Props {
  onAdd: () => void;
}

const AddTask = ({ onAdd }: Props): ReactElement => {

  return (
    <Button
      onClick={ onAdd }
      shape="circle"
      icon={ <PlusCircleOutlined /> }
      className="add-task"
    />
  )
};

export default AddTask;