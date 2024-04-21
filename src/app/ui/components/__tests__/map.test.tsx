import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Map from "../Map/Map";
import React from "react";

describe("Mapコンポーネントのテスト",() => {
    test("オプションタグ(都道府県数)のテスト",async() => {
        render(<Map />);
        const optionList:HTMLElement[] = await screen.findAllByRole("option");
        expect(optionList).toHaveLength(47);
    })

    test("都道府県チェック",async() => {
        render(<Map />);
        const optionList:HTMLElement[] = await screen.findAllByRole("option");
        const prefectures:string[] = [
            "北海道", "青森県", "岩手県", "宮城県", "秋田県", 
            "山形県", "福島県", "茨城県", "栃木県", "群馬県", 
            "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", 
            "富山県", "石川県", "福井県", "山梨県", "長野県", 
            "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", 
            "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", 
            "鳥取県", "島根県", "岡山県", "広島県", "山口県", 
            "徳島県", "香川県", "愛媛県", "高知県", "福岡県", 
            "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", 
            "鹿児島県", "沖縄県"
        ];

        const optionPrefectures:string[] = optionList.map((option:HTMLElement) => {
            return option.innerHTML;
        })

        expect(optionPrefectures).toEqual(prefectures);
    })

    test("デフォルトで選択されている都道府県が東京都であるかをチェック",async() => {
        render(<Map />);
        const optionList:HTMLElement[] = await screen.findAllByRole("option");
        const findDefaultPrefectures = optionList.find((option:HTMLElement) => {
            return option.getAttribute("selected") !== null;
        });

        expect(findDefaultPrefectures?.innerHTML).toEqual("東京都");
    })
})