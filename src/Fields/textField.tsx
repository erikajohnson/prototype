import { Button } from "azure-devops-ui/Button";
import { LabelGroup, WrappingBehavior } from "azure-devops-ui/Label";
import { TextField } from "azure-devops-ui/TextField";
import * as React from "react";
import { Label } from "../Components/Label";
import { Popover } from "../Components/Popover";
import { labelProps } from "../Labels/LabelData";
import { HoverlayButton } from "../Components/HoverlayButton";

const StateValue = props => {
  return (
    <div className="field-value body-l font-weight-semibold">
      {props.children}
    </div>
  );
};

export default props => {
  const [value, setValue] = React.useState("Konfabulator");
  const [tempValue, setTempValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>();

  const close = () => setIsOpen(false);

  return (
    <>
      <HoverlayButton
        anchorRef={buttonRef}
        onClick={() => {
          setTempValue(value);
          setIsOpen(true);
        }}
      >
        <Label>Milestone</Label>
        <StateValue>{value}</StateValue>
      </HoverlayButton>
      {isOpen && (
        <Popover
          blurDismiss={false}
          onDismiss={() => setIsOpen(false)}
          anchorElement={buttonRef.current}
          contentProps={{
            children: (
              <>
                <div className="popover-top">
                  <div className="popover-header flex-center flex-row">
                    <div className="flex-grow">
                      <Label>Milestone</Label>
                    </div>
                  </div>
                </div>
                <div className="popover-content">
                  <TextField
                    autoFocus={true}
                    value={tempValue}
                    onChange={(_, value) => setTempValue(value)}
                  />
                </div>
                <div className="popover-buttons flex-row justify-end">
                  <Button onClick={close}>Cancel</Button>
                  <Button
                    onClick={() => {
                      setValue(tempValue);
                      close();
                    }}
                    primary
                  >
                    Save
                  </Button>
                </div>
              </>
            )
          }}
        />
      )}
    </>
  );
};
