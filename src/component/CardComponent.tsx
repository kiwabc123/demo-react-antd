
import React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import "./CardComponent.scss"
const { Meta } = Card;
import { useNavigate } from 'react-router-dom';
interface CardProps {
  titleKey: string;
  descriptionKey: string;
  path?:string 
}

export const CardComponent: React.FC<CardProps> = (props: CardProps) => {
  const { t } = useTranslation();
  const { titleKey, descriptionKey ,path} = props; 
  const navigate = useNavigate();
  
  const handleClick = () => {
    path&& navigate(path); 
  };
  return (
    <Card hoverable className="custom-card" onClick={()=>handleClick()}>
      <Meta 
        title={<h3 className="card-title">{t(titleKey)}</h3>} 
        description={
          <>
            <hr className="separator" />
            <p className="card-description">{t(descriptionKey)}</p>
          </>
        } 
      />
    </Card>
  );
};
