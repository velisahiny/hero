import React from "react";

export interface IHeroImageProps {
    imageURL: string;
}

export const HeroImage = (props: IHeroImageProps) => {
    return <img src={props.imageURL}

                style={{objectFit: "cover", width: "auto", height: 250}}
    />;
}