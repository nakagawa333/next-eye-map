import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Map from "./Map";
import React from "react";

describe("Mapコンポーネントのテスト",() => {
    it("正常レンダリング", async() => {
        render(<Map/>)
    })
})