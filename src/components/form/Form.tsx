import * as _ from 'lodash';
import * as React from 'react';



export interface IFormProps {
  extraClassName?: string;
  onSuccessfulSubmit?: () => void;
  fnValidateForm?: (elementsById: Record<string, any>) => boolean;
}

export class Form extends React.Component<IFormProps> {



  public static captureElement = (refForm: React.RefObject<Form>, id: string, element: any | null) => {
    _.defer(() => {
      const elForm = refForm.current;
      if (elForm) {
        if (element === null) {
          elForm.__removeElement(id);
        } else {
          elForm.__addElement(id, element);
        }
      }
    });
  };



  private __refForm = React.createRef<HTMLFormElement>();
  private __elementsById: Record<string, any> = {};



  public render = () => {
    return (
      <form
        ref={this.__refForm}
        className={this.props.extraClassName}
        onSubmit={this.__handleSubmit}>
        {this.props.children}
      </form>
    );
  };



  private __handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.__validate() && this.props.onSuccessfulSubmit) {
      this.props.onSuccessfulSubmit();
    }
  }



  private __validate = () => {
    const elForm = this.__refForm.current;
    if (!elForm) {
      return false;
    }

    _.forEach(this.__elementsById, element => {
      if (_.isFunction(element.validate)) {
        element.validate();
      }
    });

    if (!elForm.checkValidity()) {
      elForm.reportValidity();

      return false;
    }

    if (this.props.fnValidateForm) {
      return this.props.fnValidateForm(this.__elementsById);
    }

    return true;
  };



  private __addElement = (id: string, element: any) => {
    this.__elementsById[id] = element;
  };



  private __removeElement = (id: string) => {
    delete this.__elementsById[id];
  };

}
