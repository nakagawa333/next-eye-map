import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Contact/Contact";
import React from "react";
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();


describe("type属性のテスト",() => {
    test("お名前",async() => {
        render(<Contact />);
        const subject:HTMLElement = await screen.getByTestId("subject");
        expect(subject).toHaveAttribute("type","text");
    })

    test("メール",async() => {
        render(<Contact />);
        const email:HTMLElement = await screen.getByTestId("email");
        expect(email).toHaveAttribute("type","email");
    })

    test("送信ボタン",async() => {
        render(<Contact />);
        const email:HTMLElement = await screen.getByTestId("submit");
        expect(email).toHaveAttribute("type","submit");
    })
})

describe("HTMLタグのテスト",() => {
    test("お名前",async() => {
        render(<Contact />);
        const subject:HTMLElement = await screen.getByTestId("subject");
        expect(subject.tagName).toBe("INPUT")
    })

    test("メール",async() => {
        render(<Contact />);
        const email:HTMLElement = await screen.getByTestId("email");
        expect(email.tagName).toBe("INPUT")
    })

    test("お問い合わせ内容",async() => {
        render(<Contact />);
        const contact:HTMLElement = await screen.getByTestId("contact");
        expect(contact.tagName).toBe("TEXTAREA")
    })

    test("お問い合わせ内容",async() => {
        render(<Contact />);
        const submit:HTMLElement = await screen.getByTestId("submit");
        expect(submit.tagName).toBe("BUTTON")
    })
})

describe("入力内容の確認",() => {
    test("subjectの入力内容確認",async() => {
        render(<Contact />);
        const subject:HTMLElement = await screen.getByTestId("subject");
        const nameValue:string = "テスト太郎";
        await user.type(subject,nameValue);
        expect(subject).toHaveValue(nameValue);
    });

    test("emailの入力内容確認",async() => {
        render(<Contact />);
        const email:HTMLElement = await screen.getByTestId("email");
        const emailValue:string = "test@gmail.com";
        await user.type(email,emailValue);
        expect(email).toHaveValue(emailValue);
    });

    test("contactの入力内容確認",async() => {
        render(<Contact />);
        const contact:HTMLElement = await screen.getByTestId("contact");
        const contactValue:string = "テスト内容";
        await user.type(contact,contactValue);
        expect(contact).toHaveValue(contactValue);
    });
})