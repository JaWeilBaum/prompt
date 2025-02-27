package prompt.ls1.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Device {
    MACBOOK("Mac"), IPHONE("IPhone"), IPAD("IPad"), APPLE_WATCH("Watch"),
    RASPBERRY_PI("Raspberry Pi");

    private String value;
}
