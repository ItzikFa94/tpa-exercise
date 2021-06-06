import { copyWithin } from "puppeteer/DeviceDescriptors";
import React from "react";
import { Text, TYPOGRAPHY } from "wix-ui-tpa/Text";
import { WidgetProps } from "yoshi-flow-editor";
import { classes, st } from "./Widget.st.css";
import { Grid } from "wix-ui-tpa/Grid";
import { Card } from "wix-ui-tpa/Card";
import { Button } from "wix-ui-tpa/Button";

export type ControllerProps = {
  items: {
    uri: string;
    width: number;
    height: number;
    title: string;
    guid: string;
    mediaType: string;
    subtype: string;
    fileUrl: string;
  }[]; // Check [{}]
};
interface WidgetState {
  loadMore: boolean;
}
export class Widget extends React.Component<WidgetProps<ControllerProps>> {
  state: WidgetState = {
    loadMore: false,
  };

  loadMoreHandler = () => {
    this.setState((prevState: WidgetState) => ({
      loadMore: !prevState.loadMore,
    }));
  };

  render() {
    const maxItemsPerColumn = 3;
    const maxUnhiddenRows = 4;
    let { items } = this.props;
    if (!this.state.loadMore) {
      items = items.slice(0, maxItemsPerColumn * maxUnhiddenRows);
    }
    return (
      <div data-hook="gallery-widget" className={st(classes.root, {})}>
        <Text data-hook="widget-title" typography={TYPOGRAPHY.smallTitle}>
          OOI Gallery
        </Text>
        <Grid
          data-hook="pictures-grid"
          columnGap={20}
          maxColumnWidth={300}
          maxColumns={maxItemsPerColumn}
          minColumnWidth={130}
          rowGap={20}
          width={1000}
        >
          {items.map((item, index) => (
            <Grid.Item key={"GI" + index}>
              <Card
                key={"GIC" + index}
                info={<Text>{item.title}</Text>}
                media={
                  <div
                    style={{
                      backgroundImage: `url(https://static.wixstatic.com/${item.fileUrl}`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      height: "100%",
                    }}
                  />
                }
                mediaAspectRatio={16 / 9}
                stacked
              />
            </Grid.Item>
          ))}
        </Grid>
        {!this.state.loadMore && (
          <Button
            data-hook="load-more-btn"
            className={classes.loadMore}
            upgrade
            onClick={this.loadMoreHandler}
          >
            Load More
          </Button>
        )}
      </div>
    );
  }
}

export default Widget;
