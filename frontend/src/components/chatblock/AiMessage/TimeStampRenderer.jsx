import TimestampButton from "./TimestampButton";
import React from "react";


function formatTimeStamp_Button(text, player) {

    const regex = /\[\[(\d+(?:\.\d+)?)\]\]/g;

    const parts = text.split(regex);

    return parts.map((part, index) => {

        if (/^\d+(?:\.\d+)?$/.test(part)) {

            return (
                <TimestampButton
                    key={index}
                    time={part}
                    player={player}
                />
            );
        }

        return part;

    });
}


function TimeStampRenderer({ children, Tag , player }) {

    const childArray = React.Children.toArray(children);

                return (
                  <Tag>
                    {
                      childArray.map((child, i) => {

                        if (typeof child === "string") {

                          return (
                            <span key={i}>
                              {
                                formatTimeStamp_Button(
                                  child,
                                  player
                                )
                              }
                            </span>
                          );
                        }

                        return child;
                      })
                    }
                  </Tag>
                );


}


export default TimeStampRenderer;