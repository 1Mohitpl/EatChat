import { render } from "@testing-library/react";
import Body from "../Body";
import { Provider } from "react-redux";
import store from "../../../utils/store";
import { StaticRouter } from "react-router-dom/server";
import { restaData } from "../../mocks/data";
import  "@testing-library/jest-dom";

global.fetch = jest.fn(() =>{
   return Promise.resolve({
        json : () =>{
        return Promise.resolve(restaData)}
    });
});


test("Shimmer is loaded on rendering", () => {

     const body =  render (
        <StaticRouter>
        <Provider store={store}>
        <Body />
        </Provider>
        </StaticRouter>
      );
    
      const shimmer = body.getByTestId("shimmer");
      
      expect(shimmer.children.length).toBe(20);
      console.log(shimmer);
      
})