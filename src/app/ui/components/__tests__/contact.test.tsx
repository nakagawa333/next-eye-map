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

describe("バリデーションチェック",() => {
    test("正常パターン",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const emailValue:string = "test@gmail.com";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(email,emailValue);
        await user.type(contact,contactValue);

        //バリデーションチェック エラーメッセージ確認
        expect(subject.validationMessage).toBe("");
        expect(email.validationMessage).toBe("");
        expect(contact.validationMessage).toBe("");
    })

    test("お名前未入力",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;
        
        const emailValue:string = "test@gmail.com";
        const contactValue:string = "テスト内容";

        await user.type(email,emailValue);
        await user.type(contact,contactValue);

        //バリデーションチェック エラーメッセージ確認
        expect(subject.validationMessage).not.toBe("");
        expect(email.validationMessage).toBe("");
        expect(contact.validationMessage).toBe("");
    })

    test("メール未入力",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(contact,contactValue);

        expect(subject.validationMessage).toBe("");
        expect(email.validationMessage).not.toBe("");
        expect(contact.validationMessage).toBe("");
    })

    test("不正な形式のメールアドレス",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const emailValue:string = "test";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(email,emailValue);
        await user.type(contact,contactValue);

        //バリデーションチェック エラーメッセージ確認
        expect(subject.validationMessage).toBe("");
        expect(email.validationMessage).not.toBe("");
        expect(contact.validationMessage).toBe("");
    })

    test("お問い合わせ未入力",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const emailValue:string = "test@gmail.com";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(email,emailValue);

        //バリデーションチェック エラーメッセージ確認
        expect(subject.validationMessage).toBe("");
        expect(email.validationMessage).toBe("");
        expect(contact.validationMessage).not.toBe("");
    })
})

describe("送信ボタンクリック",() => {
    test("正常パターン",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;
        const submit:HTMLInputElement = await screen.getByTestId("submit") as HTMLInputElement;
        const nameValue:string = "テスト太郎";
        const emailValue:string = "test@gmail.com";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(email,emailValue);
        await user.type(contact,contactValue);

        //送信ボタンクリック成功時、各入力フォームの値が初期化される
        await fireEvent.click(submit);
        expect(subject.value).toBe("");
        expect(email.value).toBe("");
        expect(contact.value).toBe("");
    })

    test("お名前未入力",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;
        const submit:HTMLInputElement = await screen.getByTestId("submit") as HTMLInputElement;

        const emailValue:string = "test@gmail.com";
        const contactValue:string = "テスト内容";

        await user.type(email,emailValue);
        await user.type(contact,contactValue);
        
        //送信ボタンクリック
        await fireEvent.click(submit);

        expect(subject.value).toBe("");
        expect(email.value).not.toBe("");
        expect(contact.value).not.toBe("");
    })

    test("メール未入力",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;
        const submit:HTMLInputElement = await screen.getByTestId("submit") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(contact,contactValue);
        
        //送信ボタンクリック
        await fireEvent.click(submit);

        expect(subject.value).not.toBe("");
        expect(email.value).toBe("");
        expect(contact.value).not.toBe("");
    })

    test("不正な形式のメールアドレス",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;
        const submit:HTMLInputElement = await screen.getByTestId("submit") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const emailValue:string = "test";
        const contactValue:string = "テスト内容";

        await user.type(subject,nameValue);
        await user.type(email,emailValue);
        await user.type(contact,contactValue);
        
        //送信ボタンクリック
        await fireEvent.click(submit);

        expect(subject.value).not.toBe("");
        expect(email.value).not.toBe("");
        expect(contact.value).not.toBe("");
    })

    test("お問い合わせ未入力",async() => {
        render(<Contact />);
        const subject:HTMLInputElement = await screen.getByTestId("subject") as HTMLInputElement;
        const email:HTMLInputElement = await screen.getByTestId("email") as HTMLInputElement;
        const contact:HTMLInputElement = await screen.getByTestId("contact") as HTMLInputElement;
        const submit:HTMLInputElement = await screen.getByTestId("submit") as HTMLInputElement;

        const nameValue:string = "テスト太郎";
        const emailValue:string = "test";

        await user.type(subject,nameValue);
        await user.type(email,emailValue);
        
        //送信ボタンクリック
        await fireEvent.click(submit);

        expect(subject.value).not.toBe("");
        expect(email.value).not.toBe("");
        expect(contact.value).toBe("");
    })
});