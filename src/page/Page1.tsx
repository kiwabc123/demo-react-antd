import React, { useEffect, useState } from 'react'
import "./Page1.scss"
import { useTranslation } from 'react-i18next';
import ShapeCard from './ShapeCard';
import { Col, Row } from 'antd';
import { Shape } from './enum/Shape';
const Page1 = () => {
    const { t, i18n } = useTranslation();
    const smallText = (text: string) => {

        return <div style={{
            position: "absolute",
            top: '0px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff', 
            fontSize: '12px',
            textAlign: 'center',
            padding: "2px",
            borderRight: "5px",
            background: "rgba(110, 218, 120,0.5)",
            borderRadius: "5px"

        }}>
            {text}
        </div>
    }
    const [shapeValues, setShapeValues] = useState<Shape[]>(Object.values(Shape).slice(0, 6))

    const handlePrev = () => {
        setShapeValues((prevShapes) => {
            const [first, ...rest] = prevShapes;
            return [...rest, first];
        });
    };
    const handleNext = () => {
        setShapeValues((prevShapes) => {
            const last = prevShapes[prevShapes.length - 1];
            const rest = prevShapes.slice(0, -1);
            return [last, ...rest]; 
        });
    };

    const firstRow = shapeValues.slice(0, 3);
    const secondRow = shapeValues.slice(3);
    const [position, setPosition] = useState<boolean>(false)
    const handlePosition = () => {
        setPosition((prev) => !prev)
    }

    const randomShape = () => {
        const shuffled = [...shapeValues].sort(() => Math.random() - 0.5);
        setShapeValues(shuffled);
      };
    return (
        <div className="app-container">
            <header className="page-header">
                <h1>{t("Card1Description")}</h1>
            </header>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: "center" }}>
                <div style={{ padding: '20px', backdropFilter: "blur(100px)", borderRadius: '8px', position: "relative" }}>
                    {smallText("Move Position")}
                    <Row gutter={[16, 16]} justify="center" className="card-row" style={{ height: '100%' }}>
                        <Col xs={12} sm={12} md={12} style={{ height: '100%' }}>
                            <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                <ShapeCard rotation="0" onclick={() => { handlePosition() }} />
                                <ShapeCard rotation="180" onclick={() => { handlePosition() }} />
                            </div>
                        </Col>
                    </Row></div>
                <div style={{ padding: '20px', backdropFilter: "blur(100px)", borderRadius: '8px', marginLeft: '16px', position: 'relative' }}>
                    {smallText("Move Shape")}
                    <Row gutter={[0, 16]} justify="center"> <ShapeCard rotation="90" onclick={() => { handleNext() }} />
                        <ShapeCard rotation="270" onclick={() => { handlePrev() }} /></Row></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, width: "80%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: position ? "flex-start" : "flex-end" }}>
                    <Row gutter={[16, 8]}>
                        {firstRow.map((value, index) => (
                            <Col xs={24} sm={12} md={8} key={`first-${index}`}>
                                <ShapeCard rotation="0" onclick={() => {randomShape()}} shape={value} />
                            </Col>
                        ))}
                    </Row>

                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: position ? "flex-end" : "flex-start", marginTop: 20 }}>
                    <Row gutter={[16, 8]}>
                        {secondRow.map((value, index) => (
                            <Col xs={24} sm={12} md={8} key={`second-${index}`} >
                                <ShapeCard rotation="0" onclick={() => {randomShape()}} shape={value} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

        </div>
    )
}

export default Page1