"use server"
import { render, screen, act } from "@testing-library/react";
import Page from "./page";
import * as db from "../../db"
import * as data from '../../lib/data';
jest.mock("../../db")
jest.mock("../../lib/data")
describe("Invoices Home", () => {
    let fetchInvoicesPages
    let poolQuery
    let container:HTMLElement
    beforeEach(async() => {
        // Clear all instances and calls to constructor and all methods:
        //postPool.mockClear();

        await act(async () => {
            // render components
            container = render(<Page />).container;
        });
    });

    beforeEach(() => {
        poolQuery = jest.spyOn(db, 'poolQuery').mockImplementation((query, data)=>Promise.resolve({rows:[{count: 0, paid:0, pending:0}]}));
        fetchInvoicesPages = jest.spyOn(data, 'fetchInvoicesPages');

    })
    it("Invoices home", async () => {


        // await act(async () => {
        // const r = render(<Page />);

        // container = r.container;
        //   container = getByText('10');
        //});


        const heading = screen.getByRole('heading');
        //console.log(heading)
        expect(heading).toHaveTextContent("Invoices");

        expect(container).toBeInTheDocument();
        if (container) {
            const heading2 = container.querySelector('h2');
            //console.log(heading)
            expect(heading2).toHaveTextContent("Home");
        }
    });
})
